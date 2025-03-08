package containermanager

import (
	"context"
	"flag"
	"path/filepath"

	v1 "k8s.io/api/core/v1"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	"k8s.io/apimachinery/pkg/watch"
	"k8s.io/client-go/kubernetes"
	"k8s.io/client-go/rest"
	"k8s.io/client-go/tools/clientcmd"
	"k8s.io/client-go/util/homedir"
)

func NewOrchestrator() *Orchestrator {
	var kubeconfig *string

	if home := homedir.HomeDir(); home != "" {
		kubeconfig = flag.String("kubeconfig", filepath.Join(home, ".kube", "config"), "(optional) absolute path to the kubeconfig file")
	} else {
		kubeconfig = flag.String("kubeconfig", "", "absolute path to the kubeconfig file")
	}
	flag.Parse()

	config, err := rest.InClusterConfig()
	if err != nil {
		config, err = clientcmd.BuildConfigFromFlags("", *kubeconfig)
		if err != nil {
			panic(err.Error())
		}
	}

	clientset, err := kubernetes.NewForConfig(config)

	if err != nil {
		panic(err.Error())
	}

	return &Orchestrator{clientset: clientset}
}

type Orchestrator struct {
	clientset *kubernetes.Clientset
}

func (o *Orchestrator) Init() {

}

func (o *Orchestrator) Shutdown() {

}

func (o *Orchestrator) GetIntancePod(name string) *v1.Pod {
	podClient := o.clientset.CoreV1().Pods("default")
	pod, err := podClient.Get(context.Background(), name, metav1.GetOptions{})

	if err != nil {
		panic(err.Error())
	}

	return pod
}

func (o *Orchestrator) WatchPods(namespace string) {
	for {
		watcher, err := o.clientset.CoreV1().Pods(namespace).Watch(context.TODO(), metav1.ListOptions{
			LabelSelector: "app=android",
		})

		if err != nil {
			panic(err.Error())
		}

		for {
			select {
			case event, ok := <-watcher.ResultChan():
				if !ok {
					break
				}

				pod, ok := event.Object.(*v1.Pod)

				if !ok {
					continue
				}

				switch event.Type {
				case watch.Added:
					println("Pod added: ", pod.Name)
				case watch.Modified:
					println("Pod modified: ", pod.Name)
				case watch.Deleted:
					println("Pod deleted: ", pod.Name)
				case watch.Error:
					println("Pod error: ", pod.Name)
				}

			}
		}

	}

}
func (o *Orchestrator) CreateInstancePod(name string) *v1.Pod {
	pod := &v1.Pod{
		ObjectMeta: metav1.ObjectMeta{
			Name: name,
			Labels: map[string]string{
				"app": "android",
			},
		},
		Spec: v1.PodSpec{
			Containers: []v1.Container{
				{
					Name: name,

					Image: "nginx",
					Env: []v1.EnvVar{
						{Name: "ENV_VAR", Value: "value"},
					},
					Ports: []v1.ContainerPort{
						{
							ContainerPort: 80,
						},
					},
				},
			},
		},
	}

	podClient := o.clientset.CoreV1().Pods("default")
	createdPod, err := podClient.Create(context.Background(), pod, metav1.CreateOptions{})

	if err != nil {
		panic(err.Error())
	}
	return createdPod
}

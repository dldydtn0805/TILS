class CircularQueue:
    # 주어진 크기로 순환 큐를 초기화합니다.
    def __init__(self, size):
        self.size = size  # 순환 큐의 고정 크기
        self.items = [None] * size  # 큐의 저장 공간
        self.front = -1  # 큐의 앞을 가리키는 인덱스
        self.rear = -1  # 큐의 뒤를 가리키는 인덱스

    # 데이터 추가
    def enqueue(self, data):
        if self.isFull():  # 큐가 가득 찼을 경우
            raise IndexError("Queue is Full")

        if self.front == -1:  # 큐가 비어있을 경우
            self.front = 0

        self.rear = (self.rear + 1) % self.size
        self.items[self.rear] = data

    # 데이터 제거
    def dequeue(self):
        if self.isEmpty():  # 큐가 비어있을 경우
            raise IndexError("Queue is Empty")

        # front에 위치한 데이터 저장
        data = self.items[self.front]

        # front에 위치한 데이터 초기화
        self.items[self.front] = None

        # 데이터가 하나밖에 없는 경우(dequeue이후 빈 순환 큐가 될 경우)
        if self.front == self.rear:
            self.front = -1
            self.rear = -1
        else:
            self.front = (self.front + 1) % self.size

        return data

    # 큐의 크기 반환
    def length(self):
        if self.isEmpty():  # 큐가 비어있을 경우
            return 0
        return (self.rear - self.front + 1) % self.size

    # 큐가 비어있는지에 대한 결과값을 boolean형으로 반환
    def isEmpty(self):
        return self.front == -1

    # 큐가 가득 차있는지에 대한 결과값을 boolean형으로 반환
    def isFull(self):
        return (self.rear + 1) % self.size == self.front
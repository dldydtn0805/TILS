class Queue:
    def __init__(self):
        self.items = []

    # 큐의 가장 끝에 새로운 데이터 추가
    def enqueue(self, data):
        self.items.append(data)

    # 큐의 가장 앞에서 데이터 제거 후 반환
    def dequeue(self):
        if self.isEmpty():
            raise IndexError("Queue is Empty")
        return self.items.pop(0)

    # 큐의 가장 앞에 저장된 데이터 반환
    def front(self):
        if self.isEmpty():
            raise IndexError("Queue is Empty")
        return self.items[0]

    # 큐의 가장 뒤에 저장된 데이터 반환
    def back(self):
        if self.isEmpty():
            raise IndexError("Queue is Empty")
        return self.items[-1]

    # 큐의 길이 반환
    def length(self):
        return len(self.items)

    # 큐가 비어있는지에 대한 결과값을 boolean형으로 반환
    def isEmpty(self):
        return len(self.items) == 0
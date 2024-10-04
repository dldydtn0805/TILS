# 노드 정의
class CNode:
    def __init__(self, data):
        self.data = data
        self.next = None

# 원형 연결 리스트 정의
class CircularLinkedList:
    def __init__(self):
        self.head = None
    # 원형 연결 리스트의 끝에 새로운 노드 추가
    def append(self, data):
        new_node = CNode(data)
        if not self.head:
            self.head = new_node
            new_node.next = self.head
            return
        current = self.head
        while current.next != self.head:
            current = current.next
        current.next = new_node
        new_node.next = self.head

    # 원형 연결 리스트의 특정 위치에 새로운 노드 추가
    def insert_at(self, data, position):
        new_node = CNode(data)
        if position == 0:  # 삽입 위치가 0인 경우
            if not self.head:
                self.head = new_node
                new_node.next = self.head
            else:
                current = self.head
                while current.next != self.head:
                    current = current.next
                current.next = new_node
                new_node.next = self.head
                self.head = new_node
            return
        current = self.head
        for _ in range(position):
            current = current.next
            if current == self.head:
                raise IndexError("Position out of bounds")
        new_node.next = current.next
        current.next = new_node

    # 원형 연결 리스트의 특정 위치에 있는 노드 삭제
    def delete_at(self, position):
        if self.head is None:
            raise IndexError("List is empty")
        current = self.head
        if position == 0:  # 삭제 위치가 0인 경우
            if current.next == self.head:  # 단일 노드만 있는 경우
                self.head = None
                return
            while current.next != self.head:
                current = current.next
            current.next = self.head.next
            self.head = self.head.next
            return
        for _ in range(position - 1):
            current = current.next
            if current.next == self.head:
                raise IndexError("Position out of bounds")
        current.next = current.next.next

    # 원형 연결 리스트 출력
    def display(self):
        if not self.head:
            print("Empty List")
            return
        current = self.head
        while True:
            print(current.data, end=" -> ")
# 노드 정의
class DNode:
    def __init__(self, data):
        self.data = data # 데이터 필드
        self.next = None # 다음 링크 필드
        self.prev = None # 이전 링크 필드

# 양방향 연결 리스트 정의
class DoublyLinkedList:
    def __init__(self):
        self.head = None

    # 양방향 연결 리스트의 마지막에 새로운 노드 추가
    def append(self, data):
        new_node = DNode(data)
        if not self.head:
            self.head = new_node
            return
        current = self.head
        while current.next:
            current = current.next
        current.next = new_node
        new_node.prev = current

    # 양방향 연결 리스트의 특정 위치에 새로운 노드 추가
    def insert_at(self, data, position):
        new_node = DNode(data)
        # 삽입 위치가 0인 경우
        if position == 0:
            new_node.next = self.head
            if self.head:
                self.head.prev = new_node
            self.head = new_node
            return
        # 중간에 삽입할 경우
        current = self.head
        for _ in range(position):
            if current is None:
                raise IndexError("Position out of bounds")
            current = current.next
        new_node.prev = current.prev
        new_node.next = current
        if current.prev:
            current.prev.next = new_node
        current.prev = new_node
    # 특정 위치의 노드 삭제
    def delete_at(self, position):
        if self.head is None:
            raise IndexError("List is empty")
        current = self.head
        if position == 0:  # 삭제 위치가 0인 경우
            self.head = current.next
            if self.head:
                self.head.prev = None
            return
        for _ in range(position):
            if current is None:
                raise IndexError("Position out of bounds")
            current = current.next
        if current is None:
            raise IndexError("Position out of bounds")
        if current.next:
            current.next.prev = current.prev
        if current.prev:
            current.prev.next = current.next

    # 앙방향 연결 리스트 출력
    def display(self):
        current = self.head
        while current:
            print(current.data, end=" <-> ")
            current = current.next
        print("None")

# 사용 예시
# dll = DoublyLinkedList()
# dll.append(1)
# dll.append(3)
# dll.insert_at(2, 1)  # 1번 위치에 2 삽입
# dll.display()  # 1 <-> 2 <-> 3 <-> None
# dll.delete_at(1)  # 1번 위치 삭제
# dll.display()  # 1 <-> 3 <-> None
# 노드 정의
class Node:
    def __init__(self, data):
        self.data = data  # 데이터 필드
        self.next = None  # 링크 필드


class SinglyLinkedList:
    def __init__(self):
        self.head = None  # 헤드 노드

    # 연결 리스트의 끝에 새로운 노드 추가
    def append(self, data):
        new_node = Node(data)

        # 빈 연결 리스트인 경우
        if not self.head:
            self.head = new_node
            return

        # 연결 리스트 안에 노드가 존재하는 경우
        current = self.head
        while current.next:
            current = current.next
        current.next = new_node

    # 연결 리스트의 특정 위치에 새로운 노드 추가
    def insert_at(self, data, position):
        new_node = Node(data)

        # 삽입 위치가 0인 경우(head에 삽입)
        if position == 0:
            new_node.next = self.head
            self.head = new_node
            return

        # 중간에 삽입하는 경우
        current = self.head
        for _ in range(position - 1):
            if current is None:
                raise IndexError("Position out of bounds")
            current = current.next
        new_node.next = current.next
        current.next = new_node

    # 연결 리스트의 특정 위치의 노드 삭제
    def delete_at(self, position):
        # 빈 연결리스트인 경우
        if self.head is None:
            raise IndexError("List is empty")
        # head에 위치한 노드 삭제 시
        if position == 0:
            self.head = self.head.next
            return
        # 중간에 위치한 노드 삭제 시
        current = self.head
        for _ in range(position - 1):
            if current is None or current.next is None:
                raise IndexError("Position out of bounds")
            current = current.next
        current.next = current.next.next

    # 연결 리스트 출력
    def display(self):
        current = self.head
        while current:
            print(current.data, end=" -> ")
            current = current.next
        print("None")

# 사용 예시
# sll = SinglyLinkedList()
# sll.append(1)
# sll.append(3)
# sll.insert_at(2, 1)  # 1번 위치에 2 삽입
# sll.display()  # 1 -> 2 -> 3 -> None
# sll.delete_at(1)  # 1번 위치 삭제
# sll.display()  # 1 -> 3 -> None
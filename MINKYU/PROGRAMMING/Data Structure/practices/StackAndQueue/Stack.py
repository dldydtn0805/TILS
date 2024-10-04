class Stack:
    def __init__(self):
        # 새로운 스택 객체 생성
        self.items = []

        # 새로운 데이터를 스택에 저장

    def push(self, data):
        self.items.append(data)

    # 스택의 top 위치에 저장된 데이터를 제거 후 반환
    def pop(self):
        # 비어있을 경우 에러 발생
        if self.isEmpty():
            raise IndexError("Stack is Empty")
        # 스택에 데이터가 존재할 경우 pop
        return self.items.pop()

    # 스택의 top 반환
    def top(self):
        if self.isEmpty():
            raise IndexError("Stack is Empty")
        return len(self.items) - 1

    # 스택의 길이 반환
    def length(self):
        return len(self.items)

    # 스택의 top 위치에 저장된 데이터 반환
    def peek(self):
        if self.isEmpty():
            raise IndexError("Stack is Empty")
        return self.items[-1]

    # 스택이 비어있는지에 대한 결과를 boolean형으로 반환
    def isEmpty(self):
        return len(self.items) == 0
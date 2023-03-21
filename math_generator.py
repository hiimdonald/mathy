import random
import time

# Random number with system time
random.seed(time.time())


def generate_addition_problem():
    num1 = random.randint(1, 20)
    num2 = random.randint(1, 20)
    problem = {
        "operand1": num1,
        "operand2": num2,
        "operator": "+",
        "answer": num1 + num2
    }
    return problem

def generate_multiplication_problem():
    num1 = random.randint(1, 12)
    num2 = random.randint(1, 12)
    problem = {
        "operand1": num1,
        "operand2": num2,
        "operator": "x",
        "answer": num1 * num2
    }
    return problem

def generate_division_problem():
    while True:
        num1 = random.randint(1, 144)
        num2 = random.randint(1, 12)
        if num1 >= num2 and (num1%num2) == 0 and ((num1/num2) <= 12):
            problem = {
                "operand1": num1,
                "operand2": num2,
                "operator": "÷",
                "answer": num1 / num2
            }
            return problem

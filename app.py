from flask import Flask, render_template
import random

app = Flask(__name__)


def generate_addition_problem():
    num1 = random.randint(1, 100)
    num2 = random.randint(1, 100)
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
    index = 0
    while index < 19:
        num1 = random.randint(1, 12)
        num2 = random.randint(1, 12)
        if (num1%num2) % 2 == 0 and num2 >= num1:
            problem = {
                "operand1": num1,
                "operand2": num2,
                "operator": "÷",
                "answer": num1 / num2
            }
            index += 1
            return problem




@app.route('/')
def home():
    return render_template('home.html')

@app.route('/addition')
def addition():
    problems = [generate_addition_problem() for _ in range(20)]
    return render_template('problems.html', problems=problems, enumerate=enumerate)


@app.route('/multiplication')
def multiplication():
    problems = [generate_multiplication_problem() for _ in range(20)]
    return render_template('problems.html', problems=problems, enumerate=enumerate)

@app.route('/division')
def division():
    problems = [generate_division_problem() for _ in range(20)]
    return render_template('problems.html', problems=problems, enumerate=enumerate)


if __name__ == '__main__':
    app.run(port=8000, debug=True)

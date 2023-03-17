from flask import Flask, render_template, request
from math_generator import *

app = Flask(__name__)



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

@app.route('/division', methods=['GET'])
def division():
    problems = [generate_division_problem() for _ in range(20)]
    return render_template('problems.html', problems=problems, enumerate=enumerate)


if __name__ == '__main__':
    app.run(port=8000, debug=True)

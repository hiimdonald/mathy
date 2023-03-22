from flask import Flask, render_template, request
from flask_htmx import HTMX
from flask_wtf import FlaskForm

from math_generator import *

app = Flask(__name__)
htmx = HTMX(app)


@app.route('/')
def home():
    return render_template('home.html')

@app.route('/addition',  methods=['GET', 'POST'])
def addition():
    if request.method == 'POST':
        count = int(request.form.get('total_questions'))
        problems = [generate_addition_problem() for _ in range(count)]
        return render_template('problems.html', problems=problems, enumerate=enumerate)
    else:
        problems = [generate_addition_problem() for _ in range(20)]
        return render_template('problems.html', problems=problems, enumerate=enumerate)


@app.route('/multiplication', methods=['GET', 'POST'])
def multiplication():
    if request.method == 'POST':
        count = int(request.form.get('total_questions'))
        problems = [generate_multiplication_problem() for _ in range(count)]
        return render_template('problems.html', problems=problems, enumerate=enumerate)
    else:
        problems = [generate_multiplication_problem() for _ in range(20)]
        return render_template('problems.html', problems=problems, enumerate=enumerate)

@app.route('/division', methods=['GET', 'POST'])
def division():
    if request.method == 'POST':
        count = int(request.form.get('total_questions'))
        problems = [generate_division_problem() for _ in range(count)]
        return render_template('problems.html', problems=problems, enumerate=enumerate)
    else:
        problems = [generate_division_problem() for _ in range(20)]
        return render_template('problems.html', problems=problems, enumerate=enumerate)

@app.get('/add')
def add():
    if htmx:
        prob_count = int(request.args.get('count'))
        problems = [generate_addition_problem() for _ in range(prob_count)]
        return render_template('add_problems.html', problems=problems, enumerate=enumerate)
    else:
        problems = [generate_addition_problem() for _ in range(20)]
        return render_template('addition.html', problems=problems, enumerate=enumerate)

app.get('/problems')
def problems():
    count = request.args.get('count')
    problems = [generate_addition_problem() for _ in range(count)]
    return render_template('add_problems.html', problems=problems, enumerate=enumerate)



if __name__ == '__main__':
    app.run(port=3000, debug=True)

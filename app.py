from flask import Flask, request, jsonify
from flask import render_template

app = Flask(__name__)

@app.route('/')
def index():
    app.template_folder = ''
    return render_template('/index.html')


@app.route('/generate-output', methods=['POST'])
def generate_output():

  data = request.json

  # Pass data to function
  print_data(data)

  # Return success response
  return jsonify({'status': 'Output generated!'})

def print_data(data):
  print("Hi")

if __name__ == '__main__':
  app.run(debug=True)
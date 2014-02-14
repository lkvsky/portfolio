import os
import webapp2
import jinja2

jinja_environment = jinja2.Environment(
  loader=jinja2.FileSystemLoader(os.path.dirname(__file__)))


def is_devserver():
    return os.environ['SERVER_SOFTWARE'].startswith("Dev")


class Main(webapp2.RequestHandler):
    def get(self):
        values = {
          'debug': is_devserver(),
          'current_template': jinja_environment.get_template('templates/about_me.html')
        }
        template = jinja_environment.get_template('templates/index.html')
        self.response.out.write(template.render(values))


class Work(webapp2.RequestHandler):
    def get(self):
        template = jinja_environment.get_template('templates/work.html')
        self.response.out.write(template.render())


class About(webapp2.RequestHandler):
    def get(self):
        template = jinja_environment.get_template('templates/about_me.html')
        self.response.out.write(template.render())


app = webapp2.WSGIApplication([('/', Main),
                               ('/work', Work),
                               ('/about', About)],  debug=True)

import os
import webapp2
import jinja2

jinja_environment = jinja2.Environment(
  loader=jinja2.FileSystemLoader(os.path.dirname(__file__)))


def is_devserver():
    return os.environ['SERVER_SOFTWARE'].startswith("Dev")


class AboutMe(webapp2.RequestHandler):
    def get(self):
        values = {
          'debug': is_devserver()
        }
        template = jinja_environment.get_template('templates/about_me.html')
        self.response.out.write(template.render(values))


class Projects(webapp2.RequestHandler):
    def get(self):
        values = {
          'debug': is_devserver()
        }
        template = jinja_environment.get_template('templates/projects.html')
        self.response.out.write(template.render(values))


class Professional(webapp2.RequestHandler):
    def get(self):
        values = {
          'debug': is_devserver()
        }
        template = jinja_environment.get_template('templates/professional.html')
        self.response.out.write(template.render(values))


app = webapp2.WSGIApplication([('/', AboutMe),
                               ('/projects', Projects),
                               ('/professional', Professional)],  debug=True)

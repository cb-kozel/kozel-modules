from setuptools import setup
from setuptools.command.build import build


# Override build command
class BuildCommand(build):
    def initialize_options(self):
        build.initialize_options(self)
        self.build_base = "/tmp"


setup(
    name="cb_django_aic_demo",
    version="0.1",
    packages=["aic_demo"],
    install_requires=[
        "django-cors-headers",
        "requests",
    ],
    cmdclass={"build": BuildCommand},
)

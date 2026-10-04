from django.db import models


class Project(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    tech_stack = models.JSONField(default=list)
    link = models.URLField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return self.title


class Skill(models.Model):
    category = models.CharField(max_length=100)
    items = models.JSONField(default=list)

    def __str__(self):
        return self.category


class Experience(models.Model):
    title = models.CharField(max_length=200)
    organization = models.CharField(max_length=200)
    description = models.TextField()
    start_date = models.CharField(max_length=50)
    end_date = models.CharField(max_length=50, blank=True)

    def __str__(self):
        return f'{self.title} @ {self.organization}'


class Profile(models.Model):
    full_name = models.CharField(max_length=200)
    headline = models.CharField(max_length=255)
    summary = models.TextField()
    github = models.URLField(blank=True)
    leetcode = models.URLField(blank=True)
    email = models.EmailField(blank=True)

    def __str__(self):
        return self.full_name

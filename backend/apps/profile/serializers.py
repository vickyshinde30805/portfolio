from rest_framework import serializers


class PortfolioSerializer(serializers.Serializer):
    full_name = serializers.CharField()
    headline = serializers.CharField()
    summary = serializers.CharField()
    location = serializers.CharField()
    email = serializers.EmailField()
    github = serializers.URLField(required=False, allow_blank=True)
    leetcode = serializers.URLField(required=False, allow_blank=True)
    stats = serializers.ListField(child=serializers.DictField())
    projects = serializers.ListField(child=serializers.DictField())
    skills = serializers.ListField(child=serializers.DictField())
    activities = serializers.ListField(child=serializers.DictField())
    badges = serializers.ListField(child=serializers.CharField())

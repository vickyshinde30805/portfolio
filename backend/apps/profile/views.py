from rest_framework.decorators import api_view
from rest_framework.response import Response

from .serializers import PortfolioSerializer


PORTFOLIO_DATA = {
    'full_name': 'Vicky Shinde',
    'headline': 'Aspiring software engineer, B.Tech Computer Science',
    'summary': 'I build web applications and machine learning projects, and I practise algorithms on LeetCode almost every day. Graduating in 2027 and looking for internships.',
    'location': 'India',
    'email': 'vickyshinde30805@gmail.com',
    'github': 'https://github.com/vickyshinde30805',
    'leetcode': 'https://leetcode.com/u/Vicky30805/',
    'stats': [
        {'value': '263', 'label': 'Python 3 problems on LeetCode'},
        {'value': '65', 'label': 'day LeetCode streak'},
        {'value': 'Top 20', 'label': 'FOSS FEST 2025 National Hackathon'},
        {'value': '3', 'label': 'full projects built'},
    ],
    'projects': [
        {
            'title': 'Smart Book Recommendation System',
            'description': 'A machine learning project that suggests books by combining content-based filtering with collaborative filtering in one hybrid model.',
            'tech_stack': ['Python', 'Machine Learning'],
        },
        {
            'title': 'E-Commerce Web Application',
            'description': 'An online store front end built with React.js, with Redux managing shared state such as the cart.',
            'tech_stack': ['React.js', 'Redux', 'JavaScript'],
        },
        {
            'title': 'Student Dashboard',
            'description': 'A web dashboard for students, built from scratch with core web technologies.',
            'tech_stack': ['HTML', 'CSS', 'JavaScript'],
        },
    ],
    'skills': [
        {'category': 'Languages', 'items': ['Python', 'Java', 'SQL', 'C']},
        {'category': 'Web', 'items': ['HTML', 'CSS', 'JavaScript', 'React.js', 'Redux']},
        {'category': 'Core CS', 'items': ['Data Structures', 'DBMS', 'OOP', 'Machine Learning']},
        {'category': 'Tools', 'items': ['Git', 'GitHub', 'Postman', 'VS Code']},
    ],
    'activities': [
        {'label': 'Array', 'count': 140},
        {'label': 'String', 'count': 66},
        {'label': 'Hash Table', 'count': 61},
        {'label': 'Math', 'count': 57},
        {'label': 'Two Pointers', 'count': 41},
        {'label': 'Dynamic Prog.', 'count': 39},
    ],
    'badges': ['50 Days Badge 2026', '100 Days Badge 2026', 'Aug LeetCoding Challenge'],
}


@api_view(['GET'])
def portfolio_profile(request):
    serializer = PortfolioSerializer(data=PORTFOLIO_DATA)
    serializer.is_valid(raise_exception=True)
    return Response(serializer.validated_data)

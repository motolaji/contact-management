from rest_framework import serializers
from .models import Contact, Category

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'

class ContactSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(source='category.name', read_only=True)

    class Meta:
        model = Contact
        fields = '__all__'
        extra_fields = ['category_name']

    def validate_phone(self, value):
        if value and not value.isdigit():
            raise serializers.ValidationError("Phone number should only contain digits")
        return value
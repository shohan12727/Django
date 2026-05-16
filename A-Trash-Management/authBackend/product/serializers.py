from rest_framework import serializers
from .models import Product

class ProductSerializer(serializers.ModelSerializer):
    tax_amount = serializers.SerializerMethodField()
    
    class Meta:
        model = Product
        # Explicitly list all fields, including the custom tax_amount field
        fields = [
            'id', 'product_name', 'description', 'price', 
            'stock_quantity', 'category', 'is_available', 
            'created_at', 'updated_at', 'tax_amount'
        ]
        
    def get_tax_amount(self, obj):
        # Ensure price is converted to a float or decimal for math operations
        tax_rate = 0.15
        return float(obj.price) * tax_rate

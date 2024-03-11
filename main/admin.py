from django.contrib import admin
from main.models import (Animal, CategoryProduct, Product, ImageProduct,
                         CountItemProduct, Sale, Article, Brand, Review,
                         Order, PayCard, AdminProduct, Profile, AdminOrder)

admin.site.register(Animal)
admin.site.register(CategoryProduct)
admin.site.register(Product, AdminProduct)
admin.site.register(ImageProduct)
admin.site.register(Sale)
admin.site.register(Article)
admin.site.register(Brand)
admin.site.register(Review)
admin.site.register(Order, AdminOrder)
admin.site.register(PayCard)
admin.site.register(Profile)


@admin.register(CountItemProduct)
class CountItemProductAdmin(admin.ModelAdmin):
    list_display = ('product',
                    'count',
                    'value',
                    'unit',
                    'percent')

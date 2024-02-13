from django.contrib import admin
from main.models import (Animal, CategoryProduct,
                         Product, ImageProduct, CountItemProduct, Sale,
                         Article, Brand, Review, Order, PayCard)

# Register your models here.


admin.site.register(Animal)
admin.site.register(CategoryProduct)
admin.site.register(Product)
admin.site.register(ImageProduct)
admin.site.register(CountItemProduct)
admin.site.register(Sale)
admin.site.register(Article)
admin.site.register(Brand)
admin.site.register(Review)
admin.site.register(Order)
admin.site.register(PayCard)





# Создает много записей в таблице CountItemProduct
# ---------------------------------------
#     products = Product.objects.all()
#     for product in products:
#         list_unit = ['кг', 'л', 'шт']
#         unit = list_unit[random.randint(0, 2)]
#         if unit == 'шт':
#             count = 1
#             value = 1
#         else:
#             count = random.randint(1, 5)
#         for i in range(count):
#             if unit != 'шт':
#                 value = round(random.uniform(0.1, 15), 1)
#             weight = CountItemProduct(product=product,
#                                       count=int(random.randint(1, 100)),
#                                       value=value,
#                                       unit=unit,
#                                       percent=value*100)
#             weight.save()
# ---------------------------------------

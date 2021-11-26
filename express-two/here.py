product = {
  'name': 'Burger',
  'description': 'The tastiest burger ever'
}

if 'name' in product and 'price' in product:
  print(f"{product['name']} costs {product['price']}")
else:
  print('There is no product\'s name and price')

print(f"{product['name']} costs {product['price']}")
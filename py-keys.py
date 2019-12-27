import pyautogui

print('click')

screenWidth, screenHeight = pyautogui.size()
currentMouseX, currentMouseY = pyautogui.position()
while 1:
	key = input('-->')
	print('======' + key + '==========')
	
	if key == 'key':
		print('key')
	elif key == 'click':
		print('click')
	elif key == 'altab':
		print('alt+tab')
		pyautogui.keyDown('alt')
		pyautogui.press('tab')
		pyautogui.keyUp('alt')
	else:
		print('key press ' + key)
		pyautogui.press(key) 
	pass
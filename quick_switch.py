
import sys

for line in sys.stdin.readlines():
	line.replace("'","\\'")
	print line


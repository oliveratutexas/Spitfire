import sys

for line in sys.stdin:
    a = str()
    print line.replace("'","\\'")

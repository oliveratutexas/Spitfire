import csv
import json
import sys
import os

if __name__=='__main__':
    if( len(sys.argv) == 1):
        print("Use is ./data_operations.py <data>")
        exit()
    sys.argv[1]
    pass

def getSyllableScore(a,b):
    '''
    Returns an integer for all the matching syllables in a word pronounciation.
    Ex:
       ah li v er
       boh li v er

    returns 3
    '''
    assert type(a) == str
    assert type(b) == str

    #Reverse the strings
    a = a.split(' ')[::-1]
    b = b.split(' ')[::-1]

    #count the matching suffixes
    count = 0
    limit = min(len(a),len(b))
    for step in range(limit):
        if(a[step] == b[step]):
            count += 1
        else:
            return count
    return count

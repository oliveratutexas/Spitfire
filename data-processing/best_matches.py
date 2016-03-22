#!/usr/bin/env python3

import os
import csv
import json

if __name__=='__main__':
    pass

def csv_to_json(csvFile,jsonFile):
    '''
    The CMU files are given in a csv format.
    We translate them into json to load the data browser side.
    '''
    # csvFile = open(os.path.curdir + '../data/common_words.csv',"r")
    # jsonFile = open(os.path.curdir + '../data/common_words.json',"w")

    col_labels = csvFile.readline()
    col_labels = tuple(col_labels.split(','))
    reader = csv.DictReader( csvFile, col_labels)

    print(reader)
    for row in reader:
        json.dump(row, jsonFile)
        jsonFile.write('\n')

def intersect():
    pass

def get_score(syllb1,syllb2):
    '''
    Retuns the number of matching, ending syllables in two pronunciations.

    '''
    if not syllb1:
        return 0
    if not syllb2:
        return 0

    syllb1 = syllb1[::-1]
    syllb2 = syllb2[::-1]

    max_len = max(len(syllb1),len(syllb2))
    score = 0
    for ind in range(max_len):
        if(syllb1[ind] == syllb2[ind]):
            score +=1
        else:
            break

    return score

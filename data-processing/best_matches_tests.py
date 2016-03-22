#!/usr/bin/env python3

import unittest
import best_matches as UNIT
import io

class GetScoreTests(unittest.TestCase):

    def test_Null(self):
        #make sure function returns 0 for null values
        self.assertFalse(UNIT.get_score(None,None))
        self.assertFalse(UNIT.get_score([],[]))

    def test_difference(self):
        syllb1 = ['my','name','is','ol']
        syllb2 = ['my', 'name', 'ol']
        self.assertEqual(UNIT.get_score(syllb1,syllb2),1)

    def test_same(self):
        syllb1 = ['a','b','c']
        syllb2 = ['a','b','c']
        self.assertEqual(UNIT.get_score(syllb1,syllb2),3)

    def test_csv_to_json(self):

        inFile = io.StringIO()
        outFile = io.StringIO()

        input_text = u"Label1,Label2,Label3\n1,2,3\n"
        output_text = '[{"Label1":1,"Label2":2,"Label3":3}]'

        inFile.write(input_text)
        UNIT.csv_to_json(inFile,outFile)

        self.assertEqual(output_text,outFile.getvalue())

    def test_interesct(self):
        pass

if __name__=='__main__':
    unittest.main()

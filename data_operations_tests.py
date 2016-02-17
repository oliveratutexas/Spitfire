import unittest
import data_operations as DO


class SyllablesTest(unittest.TestCase):
    def syb_test_1(self):
        test_score = DO.getSyllableScore("do re me","do re me")
        self.assertEqual(test_score,3)

if __name__=='__main__':
    unittest.main()

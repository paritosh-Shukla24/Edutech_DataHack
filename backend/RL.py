class QuizRLAgent:
    def __init__(self, initial_score=70):
        self.score = initial_score  # Start with 70 points
        self.difficulty_factors = {
            "easy": 1,
            "medium": 2,  # Moderate point changes for medium questions
            "hard": 3   # Large point changes for hard questions
        }

    def initial_update(self, difficulty):
        """Initial score update based on difficulty of the question."""
        difficulty_factor = self.difficulty_factors.get(difficulty, 0)
        self.score += difficulty_factor
        print(f"Initial update (difficulty): Score is now {self.score}")
        return self.score

    def intermediate_update(self, response_time):
        """Intermediate score update based on response time."""
        if response_time < 6:
            self.score += 2  
        elif response_time > 6:
            self.score -= 2 
        print(f"Intermediate update (response time): Score is now {self.score}")
        return self.score

    def final_update(self, correct):
        """Final score update based on correctness."""
        if correct:
            self.score += 1  
        else:
            self.score -= 2 
        print(f"Final update (correctness): Score is now {self.score}")
        return self.score

    def adjust_score(self, difficulty, response_time, correct):
        """
        Adjust user score three times based on difficulty, response time, and correctness.
        """
        self.initial_update(difficulty)

        self.intermediate_update(response_time)
        self.final_update(correct)
        self.score = max(0, min(100, self.score))

        return self.score


quiz = QuizRLAgent()


responses = [
    ("easy", 4, True),   
    ("hard", 10, False), 
    ("medium", 18, True),  
]

for difficulty, response_time, correct in responses:
    print(f"\nQuestion: {difficulty.capitalize()} | Response Time: {response_time}s | Correct: {correct}")
    updated_score = quiz.adjust_score(difficulty, response_time, correct)
    print(f"Updated score after all adjustments: {updated_score}\n")

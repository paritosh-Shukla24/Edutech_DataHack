# class QuizRLAgent:
#     def __init__(self, initial_score=70):
#         self.score = initial_score  # Start with 70 points
#         self.difficulty_factors = {
#             "easy": 1,
#             "medium": 2,  # Moderate point changes for medium questions
#             "hard": 3   # Large point changes for hard questions
#         }

#     def initial_update(self, difficulty):
#         """Initial score update based on difficulty of the question."""
#         difficulty_factor = self.difficulty_factors.get(difficulty, 0)
#         self.score += difficulty_factor
#         print(f"Initial update (difficulty): Score is now {self.score}")
#         return self.score

#     def intermediate_update(self, response_time):
#         """Intermediate score update based on response time."""
#         if response_time < 6:
#             self.score += 2  
#         elif response_time > 6:
#             self.score -= 2 
#         print(f"Intermediate update (response time): Score is now {self.score}")
#         return self.score

#     def final_update(self, correct):
#         """Final score update based on correctness."""
#         if correct:
#             self.score += 1  
#         else:
#             self.score -= 2 
#         print(f"Final update (correctness): Score is now {self.score}")
#         return self.score

#     def adjust_score(self, difficulty, response_time, correct):
#         """
#         Adjust user score three times based on difficulty, response time, and correctness.
#         """
#         self.initial_update(difficulty)

#         self.intermediate_update(response_time)
#         self.final_update(correct)
#         self.score = max(0, min(100, self.score))

#         return self.score


# quiz = QuizRLAgent()


# responses = [
#     ("easy", 4, True),   
#     ("hard", 10, False), 
#     ("medium", 18, True),  
# ]

# for difficulty, response_time, correct in responses:
#     print(f"\nQuestion: {difficulty.capitalize()} | Response Time: {response_time}s | Correct: {correct}")
#     updated_score = quiz.adjust_score(difficulty, response_time, correct)
#     print(f"Updated score after all adjustments: {updated_score}\n")
import random

class QuizRLAgent:
    def __init__(self, initial_score=70):
        self.score = initial_score  # Start with 70 points

        # Initialize weights for difficulty, response time, and correctness
        self.weights = {
            'difficulty': {'easy': 1, 'medium': 2, 'hard': 3},
            'response_time': {'fast': 2, 'medium': 0, 'slow': -2},
            'correctness': {True: 1, False: -2}
        }

        # Learning rates for updating weights
        self.learning_rates = {
            'difficulty': 0.1,
            'response_time': 0.1,
            'correctness': 0.1
        }

        # Counters to keep track of the number of times each condition occurs
        self.counters = {
            'difficulty': {'easy': 1, 'medium': 1, 'hard': 1},
            'response_time': {'fast': 1, 'medium': 1, 'slow': 1},
            'correctness': {True: 1, False: 1}
        }

    def discretize_response_time(self, response_time):
        """Discretize the continuous response time into categories."""
        if response_time < 6:
            return 'fast'
        elif response_time <= 12:
            return 'medium'
        else:
            return 'slow'

    def adjust_score(self, difficulty, response_time, correct):
        """
        Adjust user score based on difficulty, response time, and correctness.
        The agent learns and adapts the weights over time.
        """
        # Discretize response time
        response_time_cat = self.discretize_response_time(response_time)

        # Calculate score adjustments based on current weights
        difficulty_adjustment = self.weights['difficulty'][difficulty]
        response_time_adjustment = self.weights['response_time'][response_time_cat]
        correctness_adjustment = self.weights['correctness'][correct]

        # Update the score
        self.score += difficulty_adjustment + response_time_adjustment + correctness_adjustment
        self.score = max(0, min(100, self.score))  # Keep score within [0, 100]

        print(f"Adjusted score: {self.score}")

        # Update counters
        self.counters['difficulty'][difficulty] += 1
        self.counters['response_time'][response_time_cat] += 1
        self.counters['correctness'][correct] += 1

        # Simulate feedback (for learning purposes)
        reward = self.get_reward(correct, response_time_cat)

        # Update weights based on feedback
        self.update_weights(difficulty, response_time_cat, correct, reward)

        return self.score

    def get_reward(self, correct, response_time_cat):
        """
        Simulate a reward function based on correctness and response time.
        In a real scenario, this would be based on actual feedback.
        """
        reward = 0
        if correct:
            reward += 10
            if response_time_cat == 'fast':
                reward += 5
            elif response_time_cat == 'medium':
                reward += 2
        else:
            reward -= 5
            if response_time_cat == 'slow':
                reward -= 3
        return reward

    def update_weights(self, difficulty, response_time_cat, correct, reward):
        """
        Update the weights for difficulty, response time, and correctness based on the reward.
        """
        # Calculate prediction error
        total_adjustment = (self.weights['difficulty'][difficulty] +
                            self.weights['response_time'][response_time_cat] +
                            self.weights['correctness'][correct])
        error = reward - total_adjustment

        # Update weights
        self.weights['difficulty'][difficulty] += self.learning_rates['difficulty'] * error / self.counters['difficulty'][difficulty]
        self.weights['response_time'][response_time_cat] += self.learning_rates['response_time'] * error / self.counters['response_time'][response_time_cat]
        self.weights['correctness'][correct] += self.learning_rates['correctness'] * error / self.counters['correctness'][correct]

        print(f"Updated weights:")
        print(f"  Difficulty weights: {self.weights['difficulty']}")
        print(f"  Response time weights: {self.weights['response_time']}")
        print(f"  Correctness weights: {self.weights['correctness']}")



# responses = [
#     ("easy", 4, True),
#     ("hard", 10, False),
#     ("medium", 18, True),
#     ("hard", 5, True),
#     ("easy", 15, False),
#     ("medium", 7, True),
#     ("hard", 3, True),
#     ("medium", 12, False),
#     ("easy", 6, True),
#     ("hard", 20, False)
# ]

# for difficulty, response_time, correct in responses:
#     print(f"\nQuestion: {difficulty.capitalize()} | Response Time: {response_time}s | Correct: {correct}")
#     updated_score = quiz.adjust_score(difficulty, response_time, correct)
#     print(f"Updated score after adjustment: {updated_score}")


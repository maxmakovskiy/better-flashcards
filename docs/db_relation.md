#### `User`

user(**email**, first_name, last_name, created_at, updated_at)

#### `Tag`

tag(**name**, description)

#### `Deck`

deck(**deck_id**, title, description, created_at, updated_at, user_email)

deck.user_email NOT NULL <br />
deck.user_email references user.email

#### `DeckTag`

deck_tag(**deck_id, name**)

deck_tag.deck_id references deck.deck_id <br/>
deck_tag.name references tag.name

#### `Flashcard`

flashcard(**flashcard_no, deck_id**, front_side_text, front_side_img_url, back_side_text, back_side_img_url, ease_factor, interval_days, repetition_count, next_review_at, last_reviewed_at, memory_strength, created_at, updated_at)

flashcard.deck_id references deck.deck_id

#### `StudySession`

study_session(**session_id**, started_at, ended_at, total_reviews, correct_answers, avg_response_time)

#### `StudySessionDeck`

study_session_deck(**deck_id, session_id**)

study_session_deck.deck_id references deck.deck_id <br/>
study_session_deck.session_id references study_session.session_id

#### `ReviewHistory`

review_history(**session_id, flashcard_no, deck_id,** difficulty_rating, response_time_ms, is_correct, reviewed_at)

review_history.session_id refenreces study_session.session_id <br/>
review_history.flashcard_no refenreces flashcard.flashcard_no <br/>
review_history.deck_id refenreces flashcard.deck_id

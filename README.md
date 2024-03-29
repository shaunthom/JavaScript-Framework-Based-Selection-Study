# Project Overview

# Language Learning Speaker Selection Experiment

## Overview

At the core of our web-based experiment is a fundamental question: How do language learners' preferences for certain speakers influence their ability to learn new words? This project is designed to investigate the efficacy of personalized speaker selection in language acquisition.

## Motivation Behind the Experiment

What is the need for this application? Digital learning platforms offers a lot of opportunities for customized education paths, yet the impact of speaker selection on language learning remains underexplored. Our application bridges this gap, providing insights into how tailored language learning can enhance comprehension and retention.

## Core Features

- **Interactive Learning Sessions:** Engage with a web-based interface designed for optimal user experience, choosing speakers to learn from.
- **Speaker Selection Dynamics:** Experiment with the freedom to select any combination of speakers for each word, exploring diverse linguistic nuances.
- **Real-time Feedback and Adaptation:** Immediate audio playback and dynamic session adjustments based on user choices and interactions.
- **Comprehensive Learning Evaluation:** Through a structured series of tests, assess the effectiveness of personalized speaker selection on language acquisition.

## Backend Integration

The experiment is supported by a backend infrastructure that records participant interactions and preferences across various phases of the experiment. Data is stored in a MySQL database, structured as follows:

#### Database Schema

##### Learning Phase Selections

The learning phase captures data in the following format:


The table has 5 columns:

1. id: A unique number for each action a learner takes, making sure each one is counted separately.
2. participantId: A special code for each person taking part, so that we know which participant made the choices
3. trialIndex: Tells us the order of activities, like which came first, second, and so on.
4. objectOnScreen: The object a learner sees on the screen when they make a choice.
5. FilePlayed: The word that is played for the learner during the activity.

##### Recording Phase Submissions

The recording phase stores audio data along with some other peripheral data:

participant_id: Just like participantId, it's a unique code for each person.
trial_number: A number showing which activity the learner is doing.
trial_name: The name of the activity or challenge the learner is trying to complete.
audio_response: The learner's recorded answer or attempt at the challenge.

##### Comprehension Phase Selections

The comprehension phase (responsible for assessing the retention of the participants)stores data in the following strcuture:

id: Again, a unique number for each thing a learner does in this part of the test.
participant_id: The unique code that tells us which learner is doing the activity.
trial_number: Tells us the sequence of the test, like which part the learner is on.
audio_label: The word or sound that is played for the learner.
selected_label: What the learner picks as their answer after hearing the sound.

## Launch Guide

### Setup Requirements

Before diving in, ensure you have:
- A PHP and MySQL supporting server environment.
- Python setup for Flask backend operations (optional for extended functionalities).
- A contemporary browser ready for modern web applications like Chrome, Brave Browser, Safari, etc.

### Starting the Experiment

1. **Clone and Configure:**
   Begin by cloning the repository and configuring your server and database with the provided scripts.

2. **Navigate and Participate:**
   Access the experiment via your browser, following the on-screen instructions through each phase of the learning process.

## Working

#### Welcome Screen 

![demo](https://github.com/shaunthom/JavaScript-Framework-Based-Selection-Study/assets/134566032/ce93a2a6-dbac-4407-8c05-8176c28fa792)

This is the first touchpoint with participants, offering an introduction and explaining the experiment's objective.

There is a navigation button to proceed to the next step.


#### Audio Test 

![audio_response](https://github.com/shaunthom/JavaScript-Framework-Based-Selection-Study/assets/134566032/b67a1770-f93b-42b1-8829-85fc1650f1a4)

This section tests if participants' audio is working properly by playing a word and asking them to type what they hear.

There are input fields for the participants to enter the heard word and move forward.

#### Familiarization Phase

![clown_familiarization](https://github.com/shaunthom/JavaScript-Framework-Based-Selection-Study/assets/134566032/ca7e9339-f9e2-497c-bbd2-d1ba689c580e)

Participants get acquainted with the speakers' voices as they say a word in the target language.

There are Visual cues to indicate speaker selection and audio playback to familiarize with each speaker's voice.

#### Learning Phase

![selection_response](https://github.com/shaunthom/JavaScript-Framework-Based-Selection-Study/assets/134566032/e806c41f-a8ff-4e0c-a556-7d7cf5ff601a)

Here, participants choose which speaker they want to hear each word from during the learning phase.

So, they have the ability to choose from multiple speakers represented by icons. There is also a counter on the right hand of the screen which keeps track of the number of selections that the participant made.


#### Production Test

![record_response](https://github.com/shaunthom/JavaScript-Framework-Based-Selection-Study/assets/134566032/3bff8d66-6f12-4ed4-bf04-1bd800e280a0)

In this phase, participants are prompted to produce the words they've learned in the target language.

It is a relatively simple interface for recording responses and the “Record Response” button captures the participant’s spoken words.

#### Comprehension Test

![comprehension_response](https://github.com/shaunthom/JavaScript-Framework-Based-Selection-Study/assets/134566032/2256405c-9d5c-43d4-8060-462339edda2d)

Participants demonstrate their understanding by matching audio words to the correct images in this stage.

There are a grid of images to choose from and audio cues that play the word to be matched with the images.

## Practical Use

Engage with the experiment as a participant, selecting speakers, listening to words, and testing your learning through various phases. Each interaction is a step towards understanding the impact of speaker selection on language learning.

## Insights and Impact

Discover the direct effects of your speaker choices on language acquisition through detailed post-experiment analysis and results, paving the way for further research and application development in tailored language learning solutions.

## Join the Exploration

Your insights, improvements, and contributions can help expand the boundaries of this experiment. Fork the repository, dive into the code, and propose your enhancements through pull requests.


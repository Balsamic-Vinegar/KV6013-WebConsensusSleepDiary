"use client"

import {useState} from "react"
import {schematic} from "@/library/schematic"
import QuestionLoader from "@/components/QuestionLoader"
import { validateAnswer, validateEntry } from "@/library/validation"

export default function DiaryWorkflow() {
    const [questionIndex, setQuestionIndex] = useState(0) //tracks current question
    const [submission, setSubmission] = useState({}) //holds diary answers
    const [error, setError] = useState("") //holds error messages, empty string is no errors
    const [completion, setCompletion] = useState(false)

    const question = schematic[questionIndex] //select current question
    const questionAnswer = submission[question?.id] ?? "" //get current answer to select question

    function changeAnswer(newAnswer) {
        setSubmission((prev) => ({...prev, [question.id]: newAnswer,}))
        setError("")
    }

    function handleNext() {


        const validationError = validateAnswer(question, questionAnswer)

        if (validationError) {
            setError(validationError)
            return
        }

        //if not on last question step forward
        if (questionIndex < (schematic.length - 1)) {
            setQuestionIndex((prev) => prev + 1)
            setError("")
            return
        }


        const submissionErrors = validateEntry(submission)
        if (submissionErrors.length > 0) {
            setError(submissionErrors[0])
            return
        }

        setCompletion(true)

    }

    function handleBack() {
        if (questionIndex > 0) {
            setQuestionIndex((prev) => prev - 1)
            setError("")
        }
    }

    //Submission screen
    if (completion) {
        return (
            <section>
            </section>
        )
    }

    return (
        <section className="flex-col flex justify-between p-6 bg-pink-200 text-center max-w-96 min-h-96">

            <div>
                <p>Question {questionIndex + 1} of {schematic.length}</p>

                <h2 className="text-xl">{question.label}</h2>

                <p>{question.direction}</p>
            </div>

            <div className="mt-6 bg-blue-200">
                <QuestionLoader
                    question={question}
                    value={questionAnswer}
                    onChange={changeAnswer}
                    error={error}
                />
            </div>

            <div className="mt-4 flex gap-4 justify-between max-w-[164px] mx-auto bg-green-200 p-1">
                <button
                    className="bg-amber-200 disabled:opacity-50"
                    onClick={handleBack}
                    disabled={questionIndex === 0}
                >
                    {"<"}Back
                </button>

                <button onClick={handleNext} className="bg-amber-200">
                    {questionIndex === schematic.length - 1 ? "Submit" : "Next>"}
                </button>
            </div>
        </section>
    )

}
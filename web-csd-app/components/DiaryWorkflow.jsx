"use client"

import {useMemo, useState} from "react"
import {schematic} from "@/library/schematic"
//import QuestionLoader from "@components/QuestionLoader"
//import { validateAnswer, validateSubmission } from "@/library/validation"
//import

export default function DiaryWorkflow() {
    const [questionIndex, setQuestionIndex] = useState(0) //tracks current question
    const [submission, setSubmission] = useState({}) //holds diary answers
    const [error, setError] = useState("") //holds error messages, empty string is no errors
    const [completion, setCompletion] = useState(false)

    const question = schematic[questionIndex] //select current question
    const questionAnswer = submission[question?.id] ?? "" //get current answer to select question
    // const progressPercentage = useMemo(() => {
    //     return ((questionIndex + 1) / schematic.length) * 100
    // })

    function changeAnswer(newAnswer) {
        setSubmission((prev) => ({...prev, [question.id]: newAnswer,}))
        setError("")
    }

    function handleNext() {

        /*
        const validationError = validateAnswer(currentStep, currentValue);

        if (validationError) {
            setError(validationError)
            return
        }
         */

        //if not on last question step forward
        if (questionIndex < (schematic.length - 1)) {
            setQuestionIndex((prev) => prev + 1);
            setError("");
            return;
        }

        /*
        const submissionErrors = validateSubmission(submission);
        if (submissionErrors.length > 0) {
            setError(submissionErrors[0]);
            return;
        }
        */

        setCompletion(true);
    }

    function handleBack() {
        if (questionIndex > 0) {
            setQuestionIndex((prev) => prev - 1);
            setError("");
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
        <section className="p-6">

            <h1>Sleep Diary</h1>
            <p>Question {questionIndex + 1} of {schematic.length}</p>

            <h2>{question.label}</h2>

            <div className="mt-4 flex gap-4">
                <button
                    className={"bg-amber-200"}
                    onClick={handleBack}
                    disabled={questionIndex === 0}
                >
                    Back
                </button>

                <button onClick={handleNext} className={"bg-amber-200"}>
                    {questionIndex === schematic.length - 1
                        ? "Submit"
                        : "Next"}
                </button>
            </div>
        </section>
    )

}
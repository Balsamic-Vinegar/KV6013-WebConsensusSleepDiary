"use client"

import {useState} from "react"
import {schematic} from "@/library/schematic"
import {downloadJson, downloadCsv} from "@/library/export"
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

        const finalSubmission = {
            ...submission,
            [question.id]: questionAnswer,
        }

        const submissionErrors = validateEntry(finalSubmission)

        if (submissionErrors.length > 0) {
            setError(submissionErrors[0])
            return
        }

        downloadJson(finalSubmission)
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
            <section className="flex flex-col justify-between w-full max-w-96 min-h-[32rem] mx-auto p-8 bg-white rounded-2xl shadow-xl border border-zinc-200 text-center backdrop-blur-sm">

                <div className="flex flex-col gap-4 max-w-xs mx-auto w-full">

                    <button
                        onClick={() => downloadJson(submission)}
                        className="px-5 py-2.5 rounded-xl bg-zinc-200 hover:bg-zinc-300 transition"
                    >
                        Download JSON copy
                    </button>

                    <button
                        onClick={() => downloadCsv(submission)}
                        className="px-5 py-2.5 rounded-xl bg-zinc-200 hover:bg-zinc-300 transition"
                    >
                        Download CSV copy
                    </button>

                </div>

            </section>
        )
    }

    return (
        <section className="flex flex-col justify-between w-full max-w-96 min-h-[32rem] mx-auto p-8 bg-white rounded-2xl shadow-xl border border-zinc-200 text-center backdrop-blur-sm">

            <div>
                <p>Question {questionIndex + 1} of {schematic.length}</p>

                <h2 className="text-xl">{question.label}</h2>

                <p>{question.direction}</p>
            </div>

            <div className="mt-8 p-6 rounded-2xl border border-zinc-200 bg-zinc-50">
                <QuestionLoader
                    question={question}
                    value={questionAnswer}
                    onChange={changeAnswer}
                    error={error}
                />
            </div>

            <div className="flex gap-4 justify-between items-center max-w-xs mx-auto w-full">
                <button
                    className="px-5 py-2.5 rounded-xl bg-zinc-200 hover:bg-zinc-300 transition disabled:opacity-40 disabled:cursor-not-allowed"
                    onClick={handleBack}
                    disabled={questionIndex === 0}
                >
                    {"←"} Back
                </button>

                <button onClick={handleNext} className="px-5 py-2.5 rounded-xl bg-zinc-200 hover:bg-zinc-300 transition disabled:opacity-40 disabled:cursor-not-allowed">
                    {questionIndex === schematic.length - 1 ? "Submit" : "Next →"}
                </button>
            </div>
        </section>
    )

}
"use client"

import { useState } from "react"
import { generateQuizQuestions, type GenerateQuizQuestionsOutput } from "@/ai/flows/generate-quiz-questions"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { CheckCircle2, XCircle, AlertCircle, RefreshCw } from "lucide-react"
import { cn } from "@/lib/utils"

export function AssessmentQuiz() {
  const [questions, setQuestions] = useState<GenerateQuizQuestionsOutput["questions"] | null>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [isAnswered, setIsAnswered] = useState(false)
  const [score, setScore] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [isFinished, setIsFinished] = useState(false)

  const startQuiz = async () => {
    setIsLoading(true)
    try {
      const result = await generateQuizQuestions({
        numberOfQuestions: 5,
        difficulty: "medium",
        topic: "RTA Theory Test Dubai"
      })
      setQuestions(result.questions)
      setCurrentIndex(0)
      setScore(0)
      setIsFinished(false)
    } catch (error) {
      console.error("Failed to fetch questions:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleAnswer = (index: number) => {
    if (isAnswered) return
    setSelectedAnswer(index)
    setIsAnswered(true)
    if (index === questions![currentIndex].correctAnswerIndex) {
      setScore(prev => prev + 1)
    }
  }

  const nextQuestion = () => {
    if (currentIndex < questions!.length - 1) {
      setCurrentIndex(prev => prev + 1)
      setSelectedAnswer(null)
      setIsAnswered(false)
    } else {
      setIsFinished(true)
    }
  }

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <RefreshCw className="h-12 w-12 animate-spin text-primary mb-4" />
        <h3 className="font-headline text-xl font-bold">جاري توليد الأسئلة بواسطة الذكاء الاصطناعي...</h3>
        <p className="text-muted-foreground mt-2">نحن نعد لك تجربة محاكاة دقيقة لاختبار RTA</p>
      </div>
    )
  }

  if (isFinished) {
    const cognitiveRate = (score / questions!.length) * 100
    return (
      <Card className="max-w-2xl mx-auto border-accent/20 shadow-2xl bg-card/50">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-headline text-accent">معدل الإدراك المعرفي</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 text-center">
          <div className="relative inline-flex items-center justify-center p-8 rounded-full border-4 border-primary bg-primary/10">
            <span className="text-5xl font-bold">{cognitiveRate}%</span>
          </div>
          <p className="text-lg">لقد أجبت على {score} من أصل {questions!.length} أسئلة بشكل صحيح.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="p-4 rounded-lg bg-secondary">
              <h4 className="font-bold mb-1">التقييم العام</h4>
              <p className="text-muted-foreground">
                {cognitiveRate >= 80 ? "ممتاز! أنت جاهز تماماً للاختبار النظري." : 
                 cognitiveRate >= 60 ? "جيد، لكنك تحتاج لمراجعة بعض القواعد." : "ننصح بمراجعة المنهج الأكاديمي مرة أخرى."}
              </p>
            </div>
            <div className="p-4 rounded-lg bg-secondary">
              <h4 className="font-bold mb-1">نصيحة الخبير</h4>
              <p className="text-muted-foreground">ركز على إشارات المرور وسيناريوهات الأولويات في الدوارات.</p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center pb-8">
          <Button onClick={startQuiz} className="bg-primary hover:bg-primary/90">خوض التقييم مرة أخرى</Button>
        </CardFooter>
      </Card>
    )
  }

  if (!questions) {
    return (
      <div className="text-center py-12">
        <div className="mb-8 p-12 bg-primary/5 rounded-3xl border border-primary/20">
          <AlertCircle className="h-16 w-16 text-primary mx-auto mb-4" />
          <h2 className="font-headline text-3xl font-bold mb-4">اختبار محاكاة RTA</h2>
          <p className="text-muted-foreground max-w-md mx-auto mb-8">
            قم بتقييم مستواك المعرفي من خلال أسئلة تم إنشاؤها بالذكاء الاصطناعي تحاكي تماماً نظام الاختبارات في هيئة الطرق والمواصلات بدبي.
          </p>
          <Button size="lg" onClick={startQuiz} className="bg-primary hover:bg-primary/90 px-10">ابدأ التقييم الآن</Button>
        </div>
      </div>
    )
  }

  const q = questions[currentIndex]
  const progress = ((currentIndex + 1) / questions.length) * 100

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-fade-in">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-muted-foreground">السؤال {currentIndex + 1} من {questions.length}</span>
        <span className="text-sm font-bold text-accent">{q.category}</span>
      </div>
      <Progress value={progress} className="h-2 bg-secondary" />
      
      <Card className="border-border/50 bg-card/30">
        <CardHeader>
          <CardTitle className="text-xl leading-relaxed">{q.questionText}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {q.options.map((option, idx) => {
            return (
              <button
                key={idx}
                disabled={isAnswered}
                onClick={() => handleAnswer(idx)}
                className={cn(
                  "w-full flex items-center justify-between p-4 rounded-xl border-2 transition-all text-right",
                  !isAnswered && "hover:border-primary hover:bg-primary/5 border-border",
                  isAnswered && idx === q.correctAnswerIndex && "border-green-500 bg-green-500/10 text-green-400",
                  isAnswered && idx === selectedAnswer && idx !== q.correctAnswerIndex && "border-red-500 bg-red-500/10 text-red-400",
                  isAnswered && idx !== selectedAnswer && idx !== q.correctAnswerIndex && "opacity-50 border-border"
                )}
              >
                <span className="text-base font-medium">{option}</span>
                {isAnswered && idx === q.correctAnswerIndex && <CheckCircle2 className="h-5 w-5 text-green-400" />}
                {isAnswered && idx === selectedAnswer && idx !== q.correctAnswerIndex && <XCircle className="h-5 w-5 text-red-400" />}
              </button>
            )
          })}
        </CardContent>
        {isAnswered && (
          <CardFooter className="flex flex-col items-start gap-4 p-6 border-t border-border/50 bg-secondary/20">
            <div className="text-sm leading-relaxed">
              <strong className="text-accent block mb-1">الشرح العلمي:</strong>
              {q.explanation}
            </div>
            <Button onClick={nextQuestion} className="w-full bg-primary hover:bg-primary/90 mt-2">
              {currentIndex === questions.length - 1 ? "عرض النتيجة النهائية" : "السؤال التالي"}
            </Button>
          </CardFooter>
        )}
      </Card>
    </div>
  )
}

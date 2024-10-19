import { ChangeEvent, useRef } from "react";

function InputRange({ onInput = null, max, className, value, setValue }: {
    onInput?: CallableFunction | null
    max: number
    className?: string,
    value: number,
    setValue: (value: number) => void
}) {
    const ref = useRef<HTMLInputElement>(null);

    if (ref.current) {
        const Slider = ref.current;
        const progress = (value / Number(Slider.max)) * 100;

        Slider.style.background = `linear-gradient(to right, #424252 ${progress}%, #ccc ${progress}%)`;
    }

    return (
        <input ref={ref} className={className} onInput={(event: ChangeEvent<HTMLInputElement>) => {
            const SliderValue = Number(event.target.value);

            setValue(SliderValue)
            if (onInput) {
                onInput(event, value, setValue)
            }
        }
        } type="range" min="0" max={max} value={value} id="range" />
    )
}

export default InputRange;
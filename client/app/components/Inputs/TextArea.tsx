'use client'
import { FieldValues, UseFormRegister } from 'react-hook-form'

interface TextAreaProps {
	id: string
	label: string
	register: UseFormRegister<FieldValues>
	registerOptions?: any
	errors: any
}
const TextArea: React.FC<TextAreaProps> = ({
	label,
	register,
	id,
	registerOptions,
	errors,
}) => {
	return (
		<div className="w-full relative">
			<textarea
				id={id}
				{...register(id, registerOptions)}
				maxLength={180}
				minLength={20}
				rows={4}
				className="resize-none peer w-full p-4 pt-6 font-light bg-white border-2 duration-300 rounded-md outline-none transition disabled:opacity-70 disabled:cursor-not-allowed text-md z-10"
			/>
			<label
				className={`absolute text-md duration-200 peer-focus:text-[#1F8A70]  transform -translate-y-3 top-4 z-20 origin-[0]  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0  peer-focus:scale-75 peer-focus:-translate-y-4 left-4 text-neutral-600
					${errors[id] ? 'peer-focus:text-black' : 'peer-focus:text-[#1F8A70]'}
			`}>
				{label}
			</label>
			{errors[id] && (
				<div className="relative z-100 text-[1rem] right-2 bottom-0 text-md pl-2 pt-1 text-red-500">
					{errors[id] && errors[id].message}
				</div>
			)}
		</div>
	)
}

export default TextArea

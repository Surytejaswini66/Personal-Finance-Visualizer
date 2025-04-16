import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

// Define the schema using zod for validation
const schema = z.object({
  amount: z.number().positive(),
  date: z.string(),
  description: z.string().min(1),
  category: z.string().min(1),
});

// Define the type for form data based on the schema
type TransactionFormData = z.infer<typeof schema>;

// Define the type for the onSubmit prop
interface TransactionFormProps {
  onSubmit: (data: TransactionFormData) => void | Promise<void>;
}

const TransactionForm: React.FC<TransactionFormProps> = ({ onSubmit }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<TransactionFormData>({
    resolver: zodResolver(schema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('amount')} placeholder="Amount" />
      {errors.amount && <p>{errors.amount.message}</p>}

      <input {...register('date')} type="date" />
      {errors.date && <p>{errors.date.message}</p>}

      <input {...register('description')} placeholder="Description" />
      {errors.description && <p>{errors.description.message}</p>}

      <select {...register('category')}>
        <option value="food">Food</option>
        <option value="rent">Rent</option>
        <option value="utilities">Utilities</option>
        <option value="transportation">Transportation</option>
        <option value="entertainment">Entertainment</option>
      </select>
      {errors.category && <p>{errors.category.message}</p>}

      <button type="submit">Submit</button>
    </form>
  );
};

export default TransactionForm;

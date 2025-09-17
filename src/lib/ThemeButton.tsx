
import {useTheme} from 'next-themes';
import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ThemeButton = () => {
    const {theme, setTheme} = useTheme();

  return (
     <Button 
      variant='outline'
       size ='icon'
       onClick={() => setTheme(theme == 'dark' ? 'light' : 'dark')}
     >
           {theme === 'dark' ? <Sun className='h-5 w-5'/> : <Moon className='h-5 w-5'/>}  
     </Button>
  )
}

export default ThemeButton


// isme abhi hai bhut sari chize fix karne k liye like abhi error hai sabhi m isko sahi s fiz kar 
// bcgrooudn inages ka bhi panga hai isme okkh!...
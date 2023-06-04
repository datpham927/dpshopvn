import StarRateIcon from '@mui/icons-material/StarRate';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import StarOutlineIcon from '@mui/icons-material/StarOutline';

export const formatStar = (star: number, fontSize='14px') => {
    const arr = [1, 2, 3, 4, 5];
    return arr.map((i) => {
        if (i <= star) {
            return <StarRateIcon style={{ fontSize, color: '#FDD835' }} />;
        } else {
            if (i - 1 < star && star < i) {
                return <StarHalfIcon style={{ fontSize, color: '#FDD835' }} />;
            } else {
                return <StarOutlineIcon style={{ fontSize, color: '#FDD835' }} />;
            }
        }
    });
};

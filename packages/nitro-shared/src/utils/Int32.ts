export const ToInt32 = (x: number) =>
{
    const uint32 = x >>> 0;

    if(uint32 >= Math.pow(2, 31))
    {
        return uint32 - Math.pow(2, 32);
    }

    return uint32;
};

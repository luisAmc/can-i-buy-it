import { BigBlobSVG, BlobSVG } from 'src/components/shared/svg/Blob';

export default function Custom404() {
  return (
    <div className='w-full max-w-6xl mx-auto border md:rounded-xl shadow-md bg-white p-8 overflow-hidden lg:py-20'>
      <div className='flex flex-col-reverse items-center sm:items-start sm:flex-row sm:justify-between'>
        <div className='relative'>
          <BlobSVG className='fill-orange-100 absolute -left-20 top-10' />

          <div className='relative h-[400px] md:h-[520px] flex flex-col space-y-6 justify-center z-10'>
            <div className='flex flex-col space-y-2'>
              <h1 className='text-6xl font-bold'>404</h1>
              <h2 className='text-3xl font-bold'>Oops!</h2>
              <h2 className='text-3xl font-bold'>Página no encontrada</h2>
            </div>
            <div className='w-full text-gray-400 font-medium flex-flex-col space-y-1'>
              <div>Esta pagina no existe o fue removida.</div>
              <div className=''>
                Parece que no teniamos el{' '}
                <span className='italic font-bold'>budget</span> para ella...
                ajaja
              </div>
            </div>

            <a href='/' className='bg-brand-100 text-center rounded-full py-3 px-4 text-brand-500 font-semibold shadow-md hover:opacity-75'>
              Regresar al inicio
            </a>
          </div>
        </div>

        <div className='relative h-full'>
          <BigBlobSVG className='absolute fill-indigo-300 -right-18 -top-40' />

          <div className='h-full flex items-center justify-center'>
            <img
              src='/images/03c4832a-f8b4-4920-8880-5de5304bb10f.png'
              className='relative w-[300px] md:w-[520px] aspect-square'
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CVHeader({ name, email, phone, address, linkedIn }) {
  if (!(name || email || phone || address || linkedIn)) return;

  return (
    <section className="flex flex-col items-center gap-y-2 *:font-serif has-[div]:pb-8 [&_svg]:h-6">
      {name && <h2 className="text-2xl font-bold">{name}</h2>}
      {(email || phone || address || linkedIn) && (
        <div className="flex flex-wrap justify-center gap-x-3 gap-y-2">
          {email && (
            <HeaderInfo
              path={
                <path d="M22 6C22 4.9 21.1 4 20 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6M20 6L12 11L4 6H20M20 18H4V8L12 13L20 8V18Z" />
              }
              text={<HeaderText content={email} />}
            />
          )}
          {phone && (
            <HeaderInfo
              path={
                <path d="M6.62,10.79C8.06,13.62 10.38,15.94 13.21,17.38L15.41,15.18C15.69,14.9 16.08,14.82 16.43,14.93C17.55,15.3 18.75,15.5 20,15.5A1,1 0 0,1 21,16.5V20A1,1 0 0,1 20,21A17,17 0 0,1 3,4A1,1 0 0,1 4,3H7.5A1,1 0 0,1 8.5,4C8.5,5.25 8.7,6.45 9.07,7.57C9.18,7.92 9.1,8.31 8.82,8.59L6.62,10.79Z" />
              }
              text={<HeaderText content={phone} />}
            />
          )}
          {address && (
            <HeaderInfo
              path={<path d="M10,20V14H14V20H19V12H22L12,3L2,12H5V20H10Z" />}
              text={<HeaderText content={address} />}
            />
          )}
          {linkedIn && (
            <HeaderInfo
              path={
                <path d="M19 3A2 2 0 0 1 21 5V19A2 2 0 0 1 19 21H5A2 2 0 0 1 3 19V5A2 2 0 0 1 5 3H19M18.5 18.5V13.2A3.26 3.26 0 0 0 15.24 9.94C14.39 9.94 13.4 10.46 12.92 11.24V10.13H10.13V18.5H12.92V13.57C12.92 12.8 13.54 12.17 14.31 12.17A1.4 1.4 0 0 1 15.71 13.57V18.5H18.5M6.88 8.56A1.68 1.68 0 0 0 8.56 6.88C8.56 5.95 7.81 5.19 6.88 5.19A1.69 1.69 0 0 0 5.19 6.88C5.19 7.81 5.95 8.56 6.88 8.56M8.27 18.5V10.13H5.5V18.5H8.27Z" />
              }
              text={
                <a
                  className="cv-text-normal block whitespace-nowrap no-underline"
                  href={linkedIn}
                  target="_blank"
                >
                  {linkedIn}
                </a>
              }
            />
          )}
        </div>
      )}
    </section>
  );
}

function HeaderInfo({ path, text }) {
  return (
    <div className="inline-flex gap-1">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        {path}
      </svg>
      {text}
    </div>
  );
}

function HeaderText({ content }) {
  return <p className="cv-text-normal inline whitespace-nowrap">{content}</p>;
}

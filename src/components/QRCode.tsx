import { useRef } from 'react';
import { QRCode } from 'react-qrcode-logo';
import AuthDetails from '../libs/AuthDetails';
import { getLocalData } from '../storage/storage';
import { PROFILE_KEY } from '../constants/AppConstants';
import { Profile } from '../@types/global';

const QRCodeComponent = () => {
    const { user } = AuthDetails();
    const profileData: Profile | null = getLocalData(PROFILE_KEY);
    const profileURL: string = `localhost:5173/${user?.username}`;
    const qrRef = useRef<HTMLDivElement>(null); // Add type assertion for qrRef

    const downloadQR = () => {
        const canvas = qrRef.current?.querySelector('canvas'); // Add null check
        const url = canvas?.toDataURL('image/png'); // Add null check
        const a = document.createElement('a');
        a.href = url || '';
        a.download = `${user?.username}.png`;
        a.click();
    };

    return (
        <div ref={qrRef} style={{ display: ' none' }}>
            <QRCode
                value={profileURL}
                size={250}
                qrStyle="dots"
                enableCORS={true}
                logoImage={profileData?.avatar}
                logoHeight={40}
                logoWidth={40}
                logoOpacity={1}
            />
            <button onClick={downloadQR} style={{ display: 'none' }}></button>
        </div>
    );
};

export default QRCodeComponent;

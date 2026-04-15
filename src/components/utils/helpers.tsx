export const getInitials = (name: string): string => {
    return name
        .split(' ')
        .map(word => word[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);
};

export const getColorClasses = (color: string) => {
    const colorMap: Record<string, { bg: string; text: string; light: string; border: string }> = {
        purple: {
            bg: 'bg-purple-400',
            text: 'text-purple-600',
            light: 'bg-purple-100',
            border: 'border-purple-200'
        },
        blue: {
            bg: 'bg-blue-400',
            text: 'text-blue-600',
            light: 'bg-blue-100',
            border: 'border-blue-200'
        },
        green: {
            bg: 'bg-green-400',
            text: 'text-green-600',
            light: 'bg-green-100',
            border: 'border-green-200'
        },
        orange: {
            bg: 'bg-orange-400',
            text: 'text-orange-600',
            light: 'bg-orange-100',
            border: 'border-orange-200'
        },
        pink: {
            bg: 'bg-pink-400',
            text: 'text-pink-600',
            light: 'bg-pink-100',
            border: 'border-pink-200'
        },
        teal: {
            bg: 'bg-teal-400',
            text: 'text-teal-600',
            light: 'bg-teal-100',
            border: 'border-teal-200'
        }
    };

    return colorMap[color] || colorMap.blue;
};

export const getStatusBadgeClasses = (status: 'active' | 'pending' | 'completed') => {
    const statusMap = {
        active: 'bg-green-100 text-green-700 border-green-200',
        pending: 'bg-orange-100 text-orange-700 border-orange-200',
        completed: 'bg-gray-100 text-gray-700 border-gray-200'
    };

    return statusMap[status];
};

export const getStatusLabel = (status: 'active' | 'pending' | 'completed') => {
    const labelMap = {
        active: 'Aktivní',
        pending: 'Čeká',
        completed: 'Dokončeno'
    };

    return labelMap[status];
};
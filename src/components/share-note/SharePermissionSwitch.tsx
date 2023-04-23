import { Switch } from "@headlessui/react";

export const SharePermissionSwitch: React.FC<{ permission: string, enabled: boolean, setEnabled: (enabled: boolean) => void }> = ({ permission, enabled, setEnabled }) => {
    return (
        <Switch.Group as="div" className="flex items-center gap-x-2">
            <Switch.Label><li>can {permission}</li></Switch.Label>
            <Switch
                checked={enabled}
                onChange={setEnabled}
                className={`${enabled ? 'bg-green-600' : 'bg-gray-200'
                    } relative inline-flex h-6 w-11 items-center rounded-full transition-colors`}
            >
                <span className="sr-only">can {permission}</span>
                <span
                    className={`${enabled ? 'translate-x-6' : 'translate-x-1'
                        } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                />
            </Switch>
        </Switch.Group>
    );
}
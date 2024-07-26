import TerminalAudits from '@/components/TerminalAudits';
import TerminalInput from '@/components/TerminalInput';
import DefaultLayout from '@/layouts/default';


export default function TerminalPage() {
    return (
        <DefaultLayout>
            <section className="flex flex-col flex-wrap justify-center gap-4 py-8 md:py-10">
                <TerminalInput />
                <TerminalAudits />
            </section>
        </DefaultLayout>
    )
}
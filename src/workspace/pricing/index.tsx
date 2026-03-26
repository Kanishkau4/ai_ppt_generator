import { PricingTable } from '@clerk/react'
import { useTheme } from '../../components/theme-provider'
import { dark } from '@clerk/themes'

function Pricing() {
    const { theme } = useTheme();

    return (
        <div className="pt-20 pb-24 relative flex-grow flex flex-col justify-center">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[600px] bg-indigo-600/10 blur-[150px] rounded-full pointer-events-none -z-10" />
            
            <div className="container px-4 md:px-6 mx-auto">
                <div className="flex flex-col items-center text-center space-y-4 mb-14">
                    <div className="px-3 py-1 rounded-full border border-border bg-purple-500/10 text-purple-600 dark:text-purple-400 text-xs font-semibold uppercase tracking-wider">
                        Workspace Pricing
                    </div>
                    <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight">Upgrade Your Plan</h2>
                    <p className="text-muted-foreground text-lg max-w-[700px]">
                        Choose the perfect plan to scale your presentation generation needs.
                    </p>
                </div>

                <div className="w-full max-w-6xl mx-auto flex justify-center pb-20">
                    <PricingTable 
                        appearance={{
                            baseTheme: theme === 'dark' ? dark : undefined,
                            variables: {
                                colorPrimary: '#9333ea', // purple-600
                                borderRadius: '1rem',
                            },
                        }} 
                    />
                </div>
            </div>
        </div>
    )
}

export default Pricing

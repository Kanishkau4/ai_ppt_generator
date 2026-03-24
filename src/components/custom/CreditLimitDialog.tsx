import React from 'react'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "../ui/alert-dialog"
import { Link } from 'react-router-dom';

type CreditLimitDialogProps = {
    openAlertDialog: boolean;
    setOpenAlertDialog: (open: boolean) => void;
}

function CreditLimitDialog({ openAlertDialog, setOpenAlertDialog }: CreditLimitDialogProps) {
    return (
        <AlertDialog open={openAlertDialog} onOpenChange={setOpenAlertDialog}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Credit Limit Reached</AlertDialogTitle>
                    <AlertDialogDescription>
                        You have reached your credit limit. Please upgrade to a premium plan to continue using our services.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={() => { <Link to="/workspace/pricing">Upgrade</Link> }}>Upgrade</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default CreditLimitDialog
